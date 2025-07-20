import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Importa o CSS e os temas diretamente do TinyMCE instalado localmente
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';

// Estilo do editor
import 'tinymce/skins/ui/oxide/skin.min.css';
// import 'tinymce/skins/content/default/content.min.css';


export default function HTMLEditor({ id, initialValue, onBlur }: { id: string, initialValue: string | undefined, onBlur: (content: string) => void }) {
    const editorRef = useRef(null);

    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.remove();
                editorRef.current = null;
            }
        }
    }, []);

    return (
        <Editor
            id={id}
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            onInit={(_evt, editor) => {
                editorRef.current = editor
                editor.on('blur', () => {
                    onBlur(editor.getContent())
                });
            }}
            // onChange={(_evt) => setValue(editorRef.current?.getContent())}
            initialValue={initialValue}
            init={{
                license_key: "gpl",
                skin: false,
                inline: true,
            } as any}
        />
    )
}