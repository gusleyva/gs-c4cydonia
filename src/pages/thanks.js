import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiCheckboxCircleLine } from "react-icons/ri"

import Seo from "../components/seo"
import Layout from "../components/layout"

const Thanks = () => (
  <Layout className="thanks-page">
    <Seo title="Gracias" />
    <div
      className="wrapper"
      style={{
        textAlign: "center",
      }}
    >
      <RiCheckboxCircleLine
        style={{
          fontSize: "128px",
          color: "var(--primary-color)",
        }}
      />
      <h1>Recibí tu mensaje</h1>
      <p>Gracias por ponerte en contacto, responderé lo mas pronto que pueda!.</p>
      <Link to="/" className="button">
        <RiArrowLeftSLine className="icon -left" />
        Regresar al inicio.
      </Link>
    </div>
  </Layout>
)

export default Thanks
