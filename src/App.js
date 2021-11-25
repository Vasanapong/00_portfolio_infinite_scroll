import './App.css';

function App() {

  const KEY  = process.env.UNSPLASH_KEY
  let page = 1

  const displayImage = async() =>{
    // Fetch
    const result = await fetch(`https://api.unsplash.com/photos/?client_id=${KEY}&page=${page}`)
    const images = await result.json()

    // Gallery Instance
    const gallery = document.querySelector('.app__gallery')

    // Loop Through Fetch Data
    images.forEach(item=>{
          // Create Box
          const imageBox = document.createElement('div')
          imageBox.className='app__gallery-box'

          // Create ImgElement from api
          const imageElement = document.createElement('img')
          imageElement.src = item.urls.small

          // Add ImgElement to Box
          imageBox.appendChild(imageElement)

          // Add ImgBox to Gallery
          gallery.appendChild(imageBox)

          // Add Event to imageBox
          imageBox.addEventListener('click',()=>{
            document.querySelector('.app__preview-img').src = item.urls.regular
            document.querySelector('.app__preview').classList.add('active-preview')
            gallery.style.display = 'none'
          })

          // Add Event to PreviewBox
          document.querySelector('.app__preview').addEventListener('click',()=>{
            document.querySelector('.app__preview').classList.remove('active-preview')
            gallery.style.display = 'grid'
          })
    })
  }

  const checkScroll = () =>{
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if(scrollTop + clientHeight >= scrollHeight -100){
      page += 1
      displayImage()
    }
  }

  const run = () =>{
    document.addEventListener('scroll',checkScroll)
    displayImage()
  }

  run()

  return (
    <div className="App">
      <div className="app__gallery"></div>
      <div className="app__preview">
        <img src="#" alt="#" className="app__preview-img"/>
      </div>
    </div>
  );
}

export default App;


