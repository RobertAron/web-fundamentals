import React, { useEffect, useLayoutEffect } from "react"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();
import './articleLayout.scss' 
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
// import { graphql } from "gatsby"

// https://www.gatsbyjs.com/plugins/gatsby-plugin-anchor-links/
// maybe anchor link + animate in and our components that way? in an mdx?

const ArticleLayout: React.FC = ({ children }) => {
  // window hash scroll
  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLAnchorElement>('a.anchor')]
    console.log('headings')
    console.log(headings)
    function replaceURLScroll(e: Event) {
      headings.forEach(ha => {
        const rect = ha.getBoundingClientRect()
        if (rect.top > 0 && rect.bottom < 150) {
          const location = window.location.toString().split('#')[0];
          history.replaceState(null, '', `${location}${ha.hash}`)
          console.log(location)
        }
      })
    }
    document.addEventListener('scroll', replaceURLScroll)
    return () => {document.removeEventListener('scroll', replaceURLScroll)}
  })
  // const post = data.markdownRemark
  // console.log(post)
  // pull out the deckgo-highlight-code parts and 
  console.log(children)
  return (
    <div style={{ padding: '80px' }} className='articleContainer'>
      <AnimateSharedLayout>
        {children}
      </AnimateSharedLayout>
      {/* <h1>{post?.frontmatter?.title}</h1> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post?.html ?? '' }} /> */}
    </div>
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