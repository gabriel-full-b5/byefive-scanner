import { useState } from 'react'
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera'

import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign'
import { ScannerIcon } from '../assets/ScannerIcon'

type ScannerProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Scanner({ open, setOpen }: ScannerProps) {
  const [items, setItems] = useState<string[]>([])
  const [permission, requestPermission] = useCameraPermissions()

  function handleBarcodeScanned(data: BarcodeScanningResult) {
    const scannedItem = data.data

    if (items.includes(scannedItem)) return

    setItems(state => [...state, scannedItem])
  }

  if (!permission) return null

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>

        <TouchableOpacity onPress={requestPermission}>
          Grant permission
        </TouchableOpacity>
      </View>
    )
  }

  if (open) return (
    <View style={styles.root}>
      <CameraView
        style={styles.camera}
        ratio="16:9"
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            onPress={() => setOpen(false)}
            activeOpacity={0.5}
          >
            <AntDesign
              size={24}
              name="close"
              color="#FFF"
            />
          </TouchableOpacity>
        </View>

        <ScannerIcon />

        <View style={styles.container}>
          <Text style={styles.title}>Scans:</Text>

          <ScrollView
            style={styles.list}
            contentContainerStyle={{ flex: 0, flexGrow: 0 }}
          >
            {items.length ? items.map(item => (
              <View key={item} style={styles.item}>
                <Text style={styles.text}>
                  {item}
                </Text>
              </View>
            )) : (
              <View style={styles.item}>
                <Text style={styles.text}>
                  No items scanned.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,

    backgroundColor: '#000',
  },

  camera: {
    width: '100%',
    height: '100%',
    padding: 24,

    position: 'relative',
    zIndex: 2,

    alignItems: 'center',
    justifyContent: 'space-between'
  },

  list: {
    flex: 0,
    flexGrow: 0,

    width: 196,
    height: 196,

    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },

  container: {
    rowGap: 8,

    alignItems: 'center',
    justifyContent: 'center'
  },

  item: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },

  text: {
    fontSize: 16,
    lineHeight: 18,
    color: '#FFF',
  },

  title: {
    fontSize: 18,
    lineHeight: 20,

    color: '#FFF',
  },
})