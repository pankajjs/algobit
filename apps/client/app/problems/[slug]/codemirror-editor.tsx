"use client"

import CodeMirror from '@uiw/react-codemirror';
import { useContext, useEffect, useState } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import { atomone } from '@uiw/codemirror-theme-atomone'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data'; 
import { ChevronDown } from 'lucide-react';
import { CheckIcon } from '@radix-ui/react-icons';
import { UserSnippetContext } from './UserSnippetContext';

let extensions = [markdown({ base: markdownLanguage, codeLanguages: languages })]
const languageList = ["java", "python"]

export function CodeMirrorEditor({problem}:{problem: any}) {
  const [language, setLanguage] = useState(languageList[0]);
  const {userSnippet, setUserSnippet} = useContext(UserSnippetContext);
  const [showLanguageList, setShowLanguageList] = useState(false);
  
  console.log(userSnippet, language)

  useEffect(()=>{
    const loadChosenlanguage = (language:string) => {
      const languages = {python:"python", java:"java"}
      if(language === languages.python){
         return langs.python();
      }else if(language === languages.java){
        return langs.java();
      }
  
      return langs.java();
    }

    extensions = [loadChosenlanguage(language), ...extensions]
    const languageCodeStub = problem.codestubs.find((stub: any, idx: number)=> stub.language === language);
    setUserSnippet(languageCodeStub.userSnippet.trim())

  }, [language])

  return (
   
    <div className='min-w-[50%]'>
      <div className='py-1 border-b-2 border-[#383839] px-2 relative'>
        <div
        onClick={()=>setShowLanguageList(true)}
        className='flex gap-1 capitalize px-3 py-1 items-center text-gray-200 text-sm border border-gray-700 hover:border-gray-400 hover:cursor-pointer rounded-md w-fit'>
        {language} <ChevronDown size={15}/></div> 
      </div>
      {
        showLanguageList && <div className='min-h-11 p-1 m-1 absolute min-w-20 bg-gray-800 z-50 text-slate-200 border border-gray-600 rounded-md'>
          {
            languageList.map((lang:string, idx:number)=>{
              return <div key={idx} onClick={()=>{
                setLanguage(lang)
                setShowLanguageList(false)
              }} className='min-w-10 text-sm px-2 flex gap-1 items-center py-1 m-1 hover:cursor-pointer hover:border border-gray-600 rounded-md capitalize'>{lang=== language && <CheckIcon/>}{lang}</div>
            })
          }
        </div>
      }
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
        onChange={(value) => {
            setUserSnippet(value);
        }}
    />
    </div>
  );
}