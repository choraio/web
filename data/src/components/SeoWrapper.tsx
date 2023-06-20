import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Seo } from "chora/components"

function SeoWrapper({ title, description, children }: any) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return (
    <Seo
      site={site}
      title={title}
      desciption={description}
      children={children}
    />
  )
}

export default SeoWrapper