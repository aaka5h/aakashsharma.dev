import * as React from "react"
import { Link } from "gatsby"
import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet"


const useTheme = () => {
  const [theme, setTheme] = useState()
  const updateTheme = useCallback((theme) => {
    setTheme(theme)
    try {
      localStorage.setItem("theme", theme)
    } catch (e) {
    }
  }, [])

  useEffect(() => {
    // useEffect don't run on server, but still added checks
    let savedTheme
    try {
      savedTheme = localStorage.getItem("theme")
    } catch (err) {
    }
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    prefersDarkScheme.addEventListener("change", (e) => {
      const calculatedTheme = e.matches ? "dark" : "light"
      updateTheme(calculatedTheme)
    })
    updateTheme(savedTheme || (prefersDarkScheme.matches ? "dark" : "light"))

  }, [updateTheme])
  return theme
}
const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  const theme = useTheme()

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Helmet bodyAttributes={{
        class: theme
      }} />
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
