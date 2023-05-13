export default function (store: any) {
  store.subscribe((_mutation: any, state: any) => {
    localStorage.setItem('my-app-state', JSON.stringify(state))
  })

  const savedState = localStorage.getItem('my-app-state')
  if (savedState) {
    store.replaceState(JSON.parse(savedState))
  }
}