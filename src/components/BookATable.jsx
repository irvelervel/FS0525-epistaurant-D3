// Creeremo ora un componente per generare un FORM in React!
// OGNI volta che un componente React ha bisogno di interagire con un
// campo input (o ancora di più con un <form>) avete bisogno di UNO STATE
// -> il componente deve venire creato come CLASS COMPONENT

import { Component } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'

// ogni volta che dovete fare un form lo dovete modellare intorno al DATO
// che dovete inviare alle API

// l'API di oggi si aspetta un oggetto così strutturato:
// name --> string
// phone --> string/number
// numberOfPeople --> string/number
// smoking --> boolean
// dateTime --> string (data) in formato ISO
// specialRequests --> string, opzionale

class BookATable extends Component {
  // in QUALSIASI form in React, quello che cambia è l'approccio:
  // noi NON COLLEZIONEREMO i valori degli input all'invio del form...
  // ...i valori dei campi del form verranno CONTINUAMENTE salvati nello stato
  // quindi non ci sarà più necessità di raccogliere le informazioni inserite
  // nella fase di submit

  state = {
    booking: {
      // questi valori iniziali saranno quelli che andranno
      // a riempire i singoli campi del form all'avvio della pagina
      name: '',
      phone: '',
      numberOfPeople: '1',
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
    // esempio per classe condizionale
    // selected: true,
  }

  sendBooking = () => {
    console.log('invio i dati alle API', this.state.booking)
    const URL = 'https://striveschool-api.herokuapp.com/api/reservation'
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(this.state.booking),
      headers: {
        'Content-Type': 'application/json', // metodi POST e PUT
      },
    })
      .then((r) => {
        if (r.ok) {
          alert('Prenotazione salvata correttamente!')
          // svuoto il form: RESETTO LO STATO
          this.setState({
            booking: {
              name: '',
              phone: '',
              numberOfPeople: '1',
              smoking: false,
              dateTime: '',
              specialRequests: '',
            },
          })
        } else {
          throw new Error('errore nella response', r.status)
        }
      })
      .catch((e) => {
        alert('ERRORE IN INVIO DELLA PRENOTAZIONE', e)
      })
  }

  // ora colleghiamo i campi del FORM alle diverse proprietà
  // dello STATO del componente. In react questa operazione si chiama:
  // TWO-WAY DATA BINDING

  // questa procedura in React va fatta per OGNI campo input in qualsiasi
  // situazione

  render() {
    return (
      <Container
      // esempio classe condizionale
      // className={this.state.selected === true ? 'border border-danger' : ''}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center my-3">Prenota un Tavolo!</h2>
            {/* form */}
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                this.sendBooking() // sotto THIS perchè siamo in una classe
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Nome prenotazione</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Giangiorgio"
                  value={this.state.booking.name} // '' ???
                  onChange={(e) => {
                    // questa funzione dovrà, ad ogni pressione
                    // di un tasto dentro un input, mantenere aggiornata
                    // la proprietà collegata a questo input nello state
                    this.setState({
                      booking: {
                        ...this.state.booking, // mi copio in questo oggetto
                        // TUTTI i valori esistenti, e poi sovrascrivo "name"
                        name: e.target.value, // il valore dell'input
                      },
                    })
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numero di telefono</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  value={this.state.booking.phone}
                  onChange={(e) => {
                    this.setState({
                      booking: {
                        ...this.state.booking, // mi copio in questo oggetto
                        // TUTTI i valori esistenti, e poi sovrascrivo "phone"
                        phone: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>In quanti siete</Form.Label>
                <Form.Select
                  aria-label="number of people"
                  // 1
                  value={this.state.booking.numberOfPeople}
                  // 2
                  onChange={(e) => {
                    this.setState({
                      booking: {
                        ...this.state.booking,
                        numberOfPeople: e.target.value,
                      },
                    })
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6+</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori"
                  checked={this.state.booking.smoking}
                  onChange={(e) => {
                    this.setState({
                      booking: {
                        ...this.state.booking,
                        smoking: e.target.checked,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data e ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  value={this.state.booking.dateTime}
                  onChange={(e) => {
                    this.setState({
                      booking: {
                        ...this.state.booking,
                        dateTime: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergie/cani/bambini</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={this.state.booking.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      booking: {
                        ...this.state.booking,
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Prenota!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookATable

// const lucio1 = {
//   name: 'Lucio',
//   age: 20,
// }

// const lucio2 = {
//   ...lucio1, // sta portando in lucio2 name e age
//   city: 'Rome',
// }

// const lucio3 = {
//     ...lucio2,
// }
