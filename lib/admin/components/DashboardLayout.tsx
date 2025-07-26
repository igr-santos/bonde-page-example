
import { useAuth } from "@/lib/auth";
import { usePanelController } from "../DashboardContext"
import DashboardPanel from "./DashboardPanel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { activePanel, close} = usePanelController();
    // const { keycloak } = useAuth();

    return (
        <>
            <div className="bg-black text-white px-5 fixed top-0 w-full z-3 h-12 max-h-12 flex justify-between items-center">
                <p><strong>B</strong>ONDE</p>
                {/* <button className="cursor-pointer hover:underline" type="button" onClick={() => keycloak.logout()}>{t("logout")}</button> */}
            </div>
            <div className="h-12" />
            {children}
            {activePanel && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={() => {

                        }}
                    />
                    {/* Drawer */}
                    <div className="fixed top-0 left-0 w-full max-w-lg h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">Editar</h2>
                        <button onClick={close}>Fechar</button>
                        </div>
                        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                            <DashboardPanel panelId={activePanel} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}