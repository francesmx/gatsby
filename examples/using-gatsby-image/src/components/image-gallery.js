import React from "react"
import Img from "gatsby-image"
import styled from "react-emotion"
import numeral from "numeral"

import presets from "../utils/presets"
import { options, scale } from "../utils/typography"

const OuterContainer = styled(`div`)({
  background: `#fff`,
  [presets.Tablet]: {
    margin: `0 0 0 calc(-${presets.offset}vw - ${presets.gutter.tablet}px)`,
    padding: 100,
    paddingRight: 0,
  },
  [presets.Desktop]: {
    margin: `0 0 0 calc(-${presets.offset}vw - ${presets.gutter.desktop}px)`,
  },
})

const Grid = styled(`div`)({
  columnCount: 1,
  columnGap: 0,
  margin: `0 auto`,
  [presets.Mobile]: { columnCount: 2 },
  [presets.Tablet]: { columnCount: 3 },
  [presets.Hd]: { columnCount: 4 },
})

const GridItem = styled(`div`)({
  border: `4px solid transparent`,
  breakInside: `avoid`,
  position: `relative`,
  [presets.Mobile]: { borderWidth: 8 },
  [presets.Desktop]: { borderWidth: 12 },
})

const GridItemImage = styled(Img)({
  "&:hover": {
    "& div + img": {
      opacity: `1 !important`,
      transition: `none !important`,
    },
    "& img + picture > img": {
      opacity: `0 !important`,
    },
    "& span": {
      opacity: `1 !important`,
    },
  },
})

const Badge = styled(`span`)({
  ...scale(-1),
  background: `#fff`,
  bottom: 10,
  borderRadius: 2,
  color: options.bodyColor,
  fontFamily: options.monospaceFontFamily.join(`,`),
  lineHeight: 1,
  padding: `.25rem`,
  position: `absolute`,
  opacity: 0.5,
  right: 10,
})

const UnsplashMasonry = edges => (
  <OuterContainer>
    <Grid>
      {edges.images.map((image, index) => (
        <GridItem key={index}>
          <GridItemImage fluid={image.node.childImageSharp.fluid} />
          <Badge>
            SVG
            {` `}
            {numeral(
              Buffer.byteLength(
                image.node.childImageSharp.fluid.tracedSVG,
                `utf8`
              )
            ).format()}
            {` `}B
          </Badge>
        </GridItem>
      ))}
    </Grid>
  </OuterContainer>
)

export default UnsplashMasonry