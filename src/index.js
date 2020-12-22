const icon24 =
  '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>'
const icon48 =
  '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>'

const APP_ID = 'YOUR APP ID'

function run() {
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title: 'Thing of the future',
        toolbarSvgIcon: icon24,
        librarySvgIcon: icon48,
        onClick: () => {
          miro.board.ui.openLibrary('builder.html', {
            title: 'Thing of the future',
          })
        },
      },
      getWidgetMenuItems: function (selectedWidgets) {
        const firstWidget = selectedWidgets[0]
        if (firstWidget.type === 'SHAPE') {
          return [
            {
              tooltip: 'Randomize',
              svgIcon:
                '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
              onClick: () => {
                const getRandom = (array) => {
                  return array[Math.floor(Math.random() * array.length)]
                }

                console.log(firstWidget)
                if (firstWidget.metadata[APP_ID].type) {
                  const type = firstWidget.metadata[APP_ID].type
                  let text
                  if (type === 'arc') {
                    text = `<div></br></br></br><h1>${getRandom(
                      cards.arc.subtypes
                    ).toUpperCase()}</h1></br></br><h2>${getRandom(
                      cards.arc.values
                    ).toUpperCase()}</h2></div>`

                    firstWidget['text'] = text
                  } else if (type === 'terrain') {
                    text = `<div><h1>${getRandom(
                      cards.terrain.values
                    ).toUpperCase()}</h1></div>`
                    firstWidget['text'] = text
                  } else if (type === 'object') {
                    text = `<div><h1>${getRandom(
                      cards.object.values
                    ).toUpperCase()}</h1></div>`
                    firstWidget['text'] = text
                  } else if (type === 'mood') {
                    text = `<div><h1>${getRandom(
                      cards.mood.values
                    ).toUpperCase()}</h1></div>`
                    firstWidget['text'] = text
                  }

                  miro.board.widgets.update([firstWidget])
                }
                miro.showNotification('You clicked a widget menu item!')
              },
            },
          ]
        }
      },
    },
  })
}

miro.onReady(run)

// miro.onReady(() => {
//   miro.initialize({
//     extensionPoints: {
//       bottomBar: {
//         title: 'Some title',
//         svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
//         onClick: () => {
//           alert('Hi!')
//         }
//       }
//     }
//   })
// })
