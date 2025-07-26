import React, { useReducer, useRef, useCallback } from "react";
import { createContext, useContext, useContextSelector } from "use-context-selector";

type DashboardState = {
    activePanel: string | null;
    schemas: Record<string, any>;
    uiSchemas: Record<string, any>;
    formData: Record<string, any>;
}

type DashboardAction =
    | { type: "OPEN_PANEL"; panelId: string; }
    | { type: "SET_SCHEMA"; panelId: string; schema: any; uiSchema?: any }
    | { type: "UPDATE_FORM_DATA"; panelId: string; data: any }
    | { type: "CLOSE_PANEL" };

const initialState: DashboardState = {
    activePanel: null,
    schemas: {},
    uiSchemas: {},
    formData: {}
}

function reducer(state: DashboardState, action: DashboardAction): DashboardState {
    switch (action.type) {
        case "OPEN_PANEL":
            return { ...state, activePanel: action.panelId };
        case "CLOSE_PANEL":
            return { ...state, activePanel: null };
        case "SET_SCHEMA":
            return {
                ...state,
                schemas: { ...state.schemas, [action.panelId]: action.schema },
                uiSchemas: { ...state.uiSchemas, [action.panelId]: action.uiSchema ?? {} },
            };
        case "UPDATE_FORM_DATA":
            return {
                ...state,
                formData: { ...state.formData, [action.panelId]: action.data },
            };
        default:
            return state;
    }
}


type Register = {
    panelId: string;
    schema: Record<string, any>;
    uiSchema?: Record<string, any>;
    initialData?: Record<string, any>,
    action: (data: any) => void
}


const DashboardContext = createContext<{
    state: DashboardState;
    dispatch: React.Dispatch<DashboardAction>;
    registerAction: (panelId: string, action: (data: any) => void) => void;
    getAction: (panelId: string) => ((data: any) => void);
    register: (register: Register) => void;
    closePanel: () => void;
    openPanel: (panelId: string) => void;
    onChangeFormData: (panelId: string, formData: any) => void
} | null>(null);


export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const actionsRef = useRef<Record<string, (data: any) => void>>({});

    const registerAction = useCallback((panelId: string, action: (data: any) => void) => {
        actionsRef.current[panelId] = action;
    }, [])

    const getAction = useCallback((panelId: string) => actionsRef.current[panelId], []);

    const register = useCallback(({ panelId, schema, uiSchema, initialData, action }: Register) => {
        dispatch({ type: "SET_SCHEMA", panelId, schema, uiSchema });
        
        if (initialData) dispatch({ type: "UPDATE_FORM_DATA", panelId, data: initialData });
        
        registerAction(panelId, action);
    }, [dispatch]);

    const closePanel = useCallback(() => {
        dispatch({ type: "CLOSE_PANEL" });
    }, [dispatch])

    const openPanel = useCallback((panelId: string) => {
        dispatch({ type: "OPEN_PANEL", panelId });
    }, [dispatch])

    const onChangeFormData = useCallback((panelId: string, formData: any) => {
        dispatch({ type: "UPDATE_FORM_DATA", panelId, data: formData });
    }, [dispatch])

    return (
        <DashboardContext.Provider value={{ state, dispatch, registerAction, getAction, register, closePanel, openPanel, onChangeFormData }}>
            {children}
        </DashboardContext.Provider>
    );
}


export const useDashboard = () => useContext(DashboardContext);

export const useRegister = () => useContextSelector(DashboardContext, (ctx) => ctx!.register);

export const usePanelController = () => useContextSelector(DashboardContext, (ctx) => ({
    activePanel: ctx!.state.activePanel,
    close: ctx!.closePanel,
    open: ctx!.openPanel
}));

export const usePanel = (panelId: string) => useContextSelector(DashboardContext, (ctx) => {
    return {
        schema: ctx!.state.schemas[panelId],
        uiSchema: ctx!.state.uiSchemas[panelId],
        formData: ctx!.state.formData[panelId],
        onChange: (formData: any) => ctx!.onChangeFormData(panelId, formData),
        onSubmit: ctx!.getAction(panelId)
    }
})