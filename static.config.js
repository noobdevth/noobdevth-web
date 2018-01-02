import React, {Component} from 'react'
import {extractCritical} from 'emotion-server'

class Document extends Component {
  render() {
    const {Html, Head, Body, children, renderMeta} = this.props

    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style dangerouslySetInnerHTML={{__html: renderMeta.css}} />
        </Head>
        <Body>{children}</Body>
      </Html>
    )
  }
}

export default {
  getSiteProps: () => ({
    title: 'just Do It'
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/routes/index'
    },
    {
      is404: true,
      component: 'src/routes/404'
    }
  ],
  renderToHtml: (render, Comp, meta) => {
    const html = render(<Comp />)
    meta.css = extractCritical(html).css
    return html
  },
  Document
}
