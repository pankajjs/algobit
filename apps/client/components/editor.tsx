"use client"

import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import { atomone } from '@uiw/codemirror-theme-atomone'
import { historyField } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data'; 

const stateFields = { history: historyField };
let extensions = [markdown({ base: markdownLanguage, codeLanguages: languages })]

export function AlgobitEditor({problem}:{problem: any}) {
  console.log(problem)
  const [language, setLanguage] = useState("python");
  const languageCodeStub = problem.codestubs.find((stub: any, idx: number)=> stub.language === language);
  const [serializedState, setSerializedState] = useState<string|null>("");
  const [userSnippet, setUserSnippet] = useState(languageCodeStub.userSnippet);


  const loadChosenlanguage = useCallback((language: string) => {
    const languages = {python:"python"}
    if(language === languages.python){
       return langs.python();
    }

    return langs.java();
  }, [])

  extensions = [loadChosenlanguage(language), ...extensions]
  console.log(extensions);

  useEffect(()=>{
    setUserSnippet(localStorage.getItem(language) || userSnippet.trim());
    setSerializedState(localStorage.getItem('myEditorState'));

  },  [language, userSnippet])

  return (
    <div className='min-w-[50%]'>
    <CodeMirror
        theme={atomone}
        height='600px'
        maxHeight='1000px'
        minHeight='1000px'
        value={userSnippet}
        extensions={extensions}
        basicSetup={
        {
            tabSize: 4,
        }
        }
        autoFocus={true}
        initialState={
            serializedState
            ? {
                json: JSON.parse(serializedState || ''),
                fields: stateFields,
                }
            : undefined
        }
        onChange={(value, viewUpdate) => {
            localStorage.setItem(language, value);

            const state = viewUpdate.state.toJSON(stateFields);
            localStorage.setItem('myEditorState', JSON.stringify(state));
        }}
    />
    </div>
  );
}