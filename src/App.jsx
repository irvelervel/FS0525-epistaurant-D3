// il fatto di aver aggiunto bootstrap come DIPENDENZA del progetto
// non significa che sia stato AUTOMATICAMENTE inserito tra i fogli di stile
// della pagina!
import 'bootstrap/dist/css/bootstrap.min.css'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'

import RestaurantNavbar from './components/RestaurantNavbar'
import Home from './components/Home'
import BookATable from './components/BookATable'

// questa riga fa in modo che il foglio css di bootstrap venga aggiunto a App
// e di conseguenza a tutti i componenti React

// un COMPONENTE REACT può anche essere semplicemente una FUNZIONE
// che RITORNA del J S X
// JSX è una sintassi molto simile ad HTML con qualche differenza sintattica:
// - class -> className
// - for -> htmlFor
// - onclick -> onClick
// JSX permette una facile interpolazione di variabili tramite {  }

function App() {
  return (
    <>
      {/* qui vorrei illuminare Home */}
      <RestaurantNavbar illuminaLink="Home" />
      {/* qui vorrei illuminare Prenota */}
      {/* <RestaurantNavbar illuminaLink="Prenota" /> */}
      {/* qui vorrei illuminare Admin */}
      {/* <RestaurantNavbar illuminaLink="Admin" /> */}

      {/* Inseriremo qui il nostro form di prenotazione */}
      <BookATable />

      <Home />
    </>
  )
}

export default App
