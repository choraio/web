import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgDefineResolver from "../../components/register/MsgDefineResolver"
import MsgRegisterResolver from "../../components/register/MsgRegisterResolver"
import QueryResolver from "../../components/register/QueryResolver"
import QueryResolversByHash from "../../components/register/QueryResolversByHash"
import QueryResolversByIRI from "../../components/register/QueryResolversByIRI"
import QueryResolversByURL from "../../components/register/QueryResolversByURL"

import * as styles from "./index.module.css"

const RegisterPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"define resolver"}
          </div>
          <MsgDefineResolver />
        </div>
        <div className={styles.section}>
          <div>
            {"register data to resolver"}
          </div>
          <MsgRegisterResolver />
        </div>
        <div className={styles.section}>
          <div>
            {"search resolvers by id"}
          </div>
          <QueryResolver />
        </div>
        <div className={styles.section}>
          <div>
            {"search resolvers by url"}
          </div>
          <QueryResolversByURL />
        </div>
        <div className={styles.section}>
          <div>
            {"search resolvers by data iri"}
          </div>
          <QueryResolversByIRI />
        </div>
        <div className={styles.section}>
          <div>
            {"search resolvers by data content hash"}
          </div>
          <QueryResolversByHash />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default RegisterPage
