
import { useEffect } from 'react'
import { Canvas, LinearGradient, Path, Skia, vec, Text, matchFont, FontSlant, FontWeight} from '@shopify/react-native-skia'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { interpolate, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { needleCenter, needlePath, needleThetaOffset} from './needle'

// Types added because typescript widening hides the types slant and weight, if you remove this types doesn't affect the app, just gets rid of that anoying type error
type Slant = "normal" | "italic" | "oblique";
type Weight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

const { width } = Dimensions.get('screen')
const DIAMETER = width - 100
const STROKE_WIDTH = 25
const TEXT_HEIGHT_OFFSET = 90
const FONT_SIZE = 40

const arc = Skia.Path.Make().addArc(
    {
      x: (width - DIAMETER) / 2,
      y: STROKE_WIDTH,
      width: DIAMETER,
      height: DIAMETER
    },
    180,
    180
)

const fontFamily = Platform.select({ios: 'Helvetica', default: 'serif'})
const fontStyle : {fontFamily: string, fontSize: number, fontStyle: Slant, fontWeight: Weight} = {
  fontFamily,
  fontSize: FONT_SIZE,
  fontStyle: "italic",
  fontWeight: "bold",
} 
const font = matchFont(fontStyle)

export function Speedometer({aqi= 0} : {aqi: number}) {
    const needleAngle = useSharedValue(needleThetaOffset)
    const needleMeasure = useSharedValue(0.00)
  
    const needleTransform = useDerivedValue(()=> [
      {translateX: width/2 - needleCenter.x},
      {translateY: DIAMETER / 2 + STROKE_WIDTH },
      {rotateZ: needleAngle.value},
      {scaleX: 5},
      {scaleY: 5}
    ])
  
    const needleMeasureString = useDerivedValue(()=> needleMeasure.value.toFixed(2))

    useEffect(() => {
      needleAngle.value = withSpring(needleThetaOffset + interpolate(aqi, [1, 5], [0, Math.PI]), {damping: 10})
      needleMeasure.value = withTiming(aqi, {duration: 500})
    }, [aqi])
  
    return (
        <Canvas style={styles.container}>
            <Path
            path={arc}
            style="stroke"
            strokeWidth={STROKE_WIDTH}
            strokeCap="round"
            >
              <LinearGradient
                  start={vec(0,0)}
                  end={vec(width, 0)}
                  colors={["lightgreen", "red"]}
              />
            </Path>

            <Path 
            path={needlePath}
            style="fill"
            color="black"
            transform={needleTransform}
            origin={vec(needleCenter.x, needleCenter.y)}
            />

            <Text
              x={width/2 - 40}
              y={TEXT_HEIGHT_OFFSET + DIAMETER / 2}
              text={needleMeasureString}
              font={font}
            />

      </Canvas>
    )
}

const styles = StyleSheet.create({
    container: {
      width: width,
      height: DIAMETER / 2 + TEXT_HEIGHT_OFFSET
    },
})