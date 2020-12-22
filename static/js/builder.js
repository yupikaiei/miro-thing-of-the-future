const teamFrameSpacing = 50
const columnWidth = 150
const fontSize = 36
const cardSize = 300
const cardSpacing = 2
const descriptionHeight = 170
const sketchHeight = 400
const whatIfHeight = 100
const teamFrameWidth = 800
const teamFrameHeight =
  descriptionHeight + sketchHeight + whatIfHeight + cardSize * 2 + 300

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateCards(teamIndex, colX, y, widgets) {
  widgets.push(
    getImage('arc', `f${teamIndex}i0`, colX - cardSpacing - cardSize / 2, y)
  )
  widgets.push(
    getImage('terrain', `f${teamIndex}i1`, colX + cardSpacing + cardSize / 2, y)
  )
  y += cardSize + cardSpacing
  // 10 + cardSize + cardSize / 2 + cardSpacing - teamFrameHeight / 2
  widgets.push(
    getImage('object', `f${teamIndex}i2`, colX - cardSpacing - cardSize / 2, y)
  )
  widgets.push(
    getImage('mood', `f${teamIndex}i3`, colX + cardSpacing + cardSize / 2, y)
  )
  y += cardSize / 2
  return y
}

function generateCombination(teamIndex, colX, y, widgets) {
  widgets.push(
    getShape(
      'arc',
      `f${teamIndex}s0`,
      getRandom(cards.arc.subtypes),
      getRandom(cards.arc.values),
      colX - cardSpacing - cardSize / 2,
      y
    )
  )
  widgets.push(
    getShape(
      'terrain',
      `f${teamIndex}s1`,
      getRandom(cards.terrain.values),
      '',
      colX + cardSpacing + cardSize / 2,
      y
    )
  )
  y += cardSize + cardSpacing
  // 10 + cardSize + cardSize / 2 + cardSpacing - teamFrameHeight / 2
  widgets.push(
    getShape(
      'object',
      `f${teamIndex}s2`,
      getRandom(cards.object.values),
      '',
      colX - cardSpacing - cardSize / 2,
      y
    )
  )
  widgets.push(
    getShape(
      'mood',
      `f${teamIndex}s3`,
      getRandom(cards.mood.values),
      '',
      colX + cardSpacing + cardSize / 2,
      y
    )
  )
  y += cardSize / 2
  return y
}

function generateDescriptionSection(teamIndex, colX, y, widgets) {
  y += 30
  widgets.push(getText(`f${teamIndex}dt`, colX, y, 'Description'))
  y += 20 + descriptionHeight / 2
  widgets.push(getInputArea(`f${teamIndex}da`, colX, y, descriptionHeight))
  y += descriptionHeight / 2
  return y
}

function generateSketchSection(teamIndex, colX, y, widgets) {
  y += 30
  widgets.push(getText(`f${teamIndex}skt`, colX, y, 'Sketch'))
  y += 20 + sketchHeight / 2
  widgets.push(getInputArea(`f${teamIndex}ska`, colX, y, sketchHeight))
  y += sketchHeight / 2
  return y
}

function generateWhatIfSection(teamIndex, colX, y, widgets) {
  y += 30
  widgets.push(getText(`f${teamIndex}wit`, colX, y, 'What if...'))
  y += 20 + whatIfHeight / 2
  widgets.push(getInputArea(`f${teamIndex}wia`, colX, y, whatIfHeight))
  y += whatIfHeight / 2
  return y
}

async function drawTemplate(teams) {
  console.log('builder APP ID', APP_ID)
  console.log(teams)
  let widgets = []
  for (let colIdx = 0; colIdx < teams.length; colIdx++) {
    let y = 10 + cardSize / 2 - teamFrameHeight / 2
    const colX = colIdx * teamFrameWidth + teamFrameSpacing * colIdx
    y += 30
    y = generateCards(colIdx, colX, y, widgets)
    y = generateDescriptionSection(colIdx, colX, y, widgets)
    y = generateSketchSection(colIdx, colX, y, widgets)
    y = generateWhatIfSection(colIdx, colX, y, widgets)

    widgets.push(getFrame(`f${colIdx}`, colX))
  }

  await miro.board.widgets.create(widgets)
  let loaded = await miro.board.widgets.areAllWidgetsLoaded()
  console.log('loaded:', loaded)

  widgets = []

  for (let colIdx = 0; colIdx < teams.length; colIdx++) {
    let y = 10 + cardSize / 2 - teamFrameHeight / 2
    const colX = colIdx * teamFrameWidth + teamFrameSpacing * colIdx
    y += 30
    y = generateCombination(colIdx, colX, y, widgets)
  }

  await miro.board.widgets.create(widgets)
  loaded = await miro.board.widgets.areAllWidgetsLoaded()
  console.log('loaded:', loaded)
}

function getText(id, x, y, text) {
  return {
    type: 'text',
    x: x,
    y: y,
    width: cardSpacing * 2 + cardSize * 2,
    text: text,
    metadata: {
      [APP_ID]: {
        id: id,
      },
    },
    style: {
      fontFamily: miro.enums.fontFamily.NOTO_SANS,
    },
  }
}

function getInputArea(id, x, y, h) {
  return {
    type: 'shape',
    x: x,
    y: y,
    width: -10 - cardSpacing * 2 + cardSize * 2,
    height: h,
    metadata: {
      [APP_ID]: {
        id: id,
      },
    },
    style: {
      borderWidth: 5,
      backgroundColor: '#ffffff',
    },
  }
}

function getShape(cardType, id, value, subValue, x, y) {
  let text = `<div><h1>${value.toUpperCase()}</h1></div>`
  if (subValue !== '') {
    text = `<div></br></br></br><h1>${value.toUpperCase()}</h1></br></br><h2>${subValue.toUpperCase()}</h2></div>`
  }
  return {
    type: 'shape',
    metadata: {
      [APP_ID]: {
        id: id,
        type: cardType,
      },
    },
    x: x,
    y: y,
    width: cardSize,
    height: cardSize,
    text: text,
    style: {
      borderWidth: 0,
      fontFamily: miro.enums.fontFamily.NOTO_SANS,
      fontSize: 22,
      textColor: '#ffffff',
      bold: 1,
    },
  }
}

function getFrame(id, x, title) {
  return {
    type: 'frame',
    x: x,
    y: 0,
    metadata: {
      [APP_ID]: {
        id: id,
      },
    },
    width: teamFrameWidth,
    height: teamFrameHeight,
    title: title,
  }
}

function getImage(type, id, x, y) {
  return {
    metadata: {
      [APP_ID]: {
        id: id,
      },
    },
    type: 'image',
    url: `${window.location.origin}/public/images/${type}.png`,
    x: x,
    y: y,
  }
}
