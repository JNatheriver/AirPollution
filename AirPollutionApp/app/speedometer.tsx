
import { useEffect } from 'react'
import { Canvas, LinearGradient, Path, Skia, vec, Text, useFont} from '@shopify/react-native-skia'
import { Dimensions, StyleSheet } from 'react-native'
import { interpolate, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { needleCenter, needlePath, needleThetaOffset} from './needle'

const { width } = Dimensions.get('screen')
const DIAMETER = width - 100
const STROKE_WIDTH = 25

const arc = Skia.Path.Make().addArc(
    {
      x: (width - DIAMETER) / 2,
      y: 150,
      width: DIAMETER,
      height: DIAMETER
    },
    180,
    180
)

export function Speedometer({aqi= 0} : {aqi: number}) {
    const needleAngle = useSharedValue(needleThetaOffset)
    const needleMeasure = useSharedValue(0.00)
  
    const needleTransform = useDerivedValue(()=> [
      {translateX: width/2 - needleCenter.x},
      {translateY: 150 + DIAMETER / 2 - needleCenter.y},
      {rotateZ: needleAngle.value},
      {scaleX: 5},
      {scaleY: 5}
    ])
  
    const needleMeasureString = useDerivedValue(()=> needleMeasure.value.toFixed(2))
  
    useEffect(() => {
      needleAngle.value = withSpring(needleThetaOffset + interpolate(aqi, [1, 5], [0, Math.PI]), {damping: 10})
      needleMeasure.value = withTiming(aqi, {duration: 500})
    }, [aqi])
  
  
    const font = useFont(require("../assets/fonts/SpaceMono-Regular.ttf"), 35)

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
              y={210 + DIAMETER / 2}
              text={needleMeasureString}
              font={font}
            />
      </Canvas>
    )
}

const styles = StyleSheet.create({
    container: {
      width: width,
      height: DIAMETER + 63
    },
})