import { useState } from 'react'
import { Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'

import { Scanner } from './components/Scanner'

import { mare } from 'byefive-colors'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.app}>
      <StatusBar />

      <Scanner open={open} setOpen={setOpen} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(true)}
        activeOpacity={0.5}
      >
        <Text style={styles.label}>
          Open camera
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF',
  },

  button: {
    width: '100%',
    padding: 8,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: mare.mare6,
    borderRadius: 8,

    backgroundColor: mare.mare2
  },

  label: {
    fontSize: 14,
    color: mare.mare9
  },
})
