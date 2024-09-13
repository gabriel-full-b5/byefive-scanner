import { Text, View, StatusBar, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.app}>
      <Text>Byefive Scanner</Text>
      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFF',
  },
})
