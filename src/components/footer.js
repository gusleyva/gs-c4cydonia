/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri"

const Footer = () => (
  <footer
    className="site-footer"
    sx={{
      bg: "siteColor",
    }}
  >
    <div className="container">
      <p>
        Un proyecto desarrollado con GatsbyJS Starter y Netlify CMS, Hecho con{" "}
        <span className="icon -love">
          <RiHeart2Line />
        </span>{" "}
        por <Link to="/">Stackrole.com</Link>.
        Personalizado por <Link to="https://www.linkedin.com/in/gustavo-leyva-b9493846/">Tavo Leyva</Link>
      </p>
    </div>
  </footer>
)

export default Footer
