import { useEffect, useState } from "react";
function useTheme(){
  const [theme,setTheme] = useState('light')

  const themeSelect =()=>{
    if(theme === "light"){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  }

  useEffect(()=>{
    document.body.classList.value = theme
  },[theme])

  return [themeSelect]
}

export default useTheme