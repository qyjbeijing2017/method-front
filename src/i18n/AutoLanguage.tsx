import { useEffect } from "react"
import { useNavigate } from "react-router"

export function AutoLanguage() {
    const nav = useNavigate()
    useEffect(() => {
        const language = navigator.language.replace('-', '_')
        nav(`/${language}`)
    }, [nav])
    return <></>
}