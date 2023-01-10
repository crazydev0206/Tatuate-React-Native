import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function ForHTML({source, tagsStyles, baseFontStyle, containerStyle}) {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
      source={source}
      tagsStyles={tagsStyles ?? {}}
      baseStyle={baseFontStyle ?? {}}
    //   containerStyle={containerStyle??{}}
    />
  );
}