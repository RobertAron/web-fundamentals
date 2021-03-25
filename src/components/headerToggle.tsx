import React, { createContext, useContext, useEffect, useState } from 'react'

const HiddenItemsContent = createContext<string | true | undefined>(undefined)


const HiddenItemsContextProvider : React.FC = ({children}) =>{
  const [visibleElements, setVisibleElements] = useState<{[key : string]: Element}>({})
  function addElementToVisible(newElement : Element){
    const key = newElement.getAttribute('data-hidden-match')
    if(key) setVisibleElements((current)=>({...current,[key]:newElement}))
  }
  function removeElementFromVisible(newElement: Element){
    const key = newElement.getAttribute('data-hidden-match')
    if(key) setVisibleElements((current)=>{
      const {[key]: _ = null, ...rest} = current
      return rest
    })
  }
  useEffect(() => {
    const observerCallback : IntersectionObserverCallback = (entires,observer) => {
      entires.forEach(ele=>{
        if(ele.isIntersecting) addElementToVisible(ele.target)
        else removeElementFromVisible(ele.target)
      })
    }
    const observer = new IntersectionObserver(observerCallback,{threshold:.000000001})
    const articles = [...document.querySelectorAll<HTMLElement>('.article[data-hidden-match]')]
    articles.forEach(ele=>observer.observe(ele))
    return () => {observer.disconnect()}
  },[])
  const keyTopPair: [string,number][] = Object.entries(visibleElements).map((ele)=>[ele[0],ele[1].getBoundingClientRect().top])
  const topItem: [string,number] | undefined = keyTopPair.length <= 1 ? 
    keyTopPair[0] :
    keyTopPair.reduce((acc,next)=>acc[1]<next[1]?acc:next)
  console.log(visibleElements)
  return (
    <HiddenItemsContent.Provider value={topItem?.[0]}>
      {children}
    </HiddenItemsContent.Provider>
  )
} 

const useHiddenItems = () => useContext(HiddenItemsContent)

const HeaderToggle: React.FC<{ title: string }> = ({title,children}) => {
  const itemShown = useHiddenItems()
  return (
    <div className='example' data-hidden-match={title}>
      {(itemShown === true || (itemShown===title)) && children}
    </div>
  )
}


export {
  HeaderToggle,
  HiddenItemsContextProvider
}