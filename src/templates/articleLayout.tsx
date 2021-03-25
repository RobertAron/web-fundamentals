import React, { useEffect, useLayoutEffect, useState } from "react"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();
import './articleLayout.scss' 
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { HiddenItemsContextProvider } from "../components/headerToggle";
// import { graphql } from "gatsby"




const ArticleLayout: React.FC = ({ children }) => {
  return (
    <article style={{ padding: '80px' }} className='articleContainer'>
      <HiddenItemsContextProvider>
        <AnimateSharedLayout>
          {children}
        </AnimateSharedLayout>
      </HiddenItemsContextProvider>
      {/* <h1>{post?.frontmatter?.title}</h1> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post?.html ?? '' }} /> */}
    </article>
  )
}

export {
  ArticleLayout
}

// export const query = graphql`
//   query MyASDFQuery($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `