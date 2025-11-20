// PastaReviews è un componente il cui scopo è MAPPARE dei comments di una pasta
// questa pasta però non fa più parte del componente, gli deve venire fornita
// questo comporta che all'INVOCAZIONE di questo componente gli debba venire fornita
// la pasta di cui mostrare i commenti --> QUESTO COMPONENTE NECESSITA DI UNA PROP

import { ListGroup } from 'react-bootstrap'

const PastaReviews = function (props) {
  // props è SEMPRE UN OGGETTO, conterrà TUTTE le props che trasmettiamo al componente

  // volendo potete creare una variabile chiamata "pasta" a partire dalle props
  // in modo da scrivere pasta. invece di props.pasta.
  // const pasta = props.pasta
  // const { pasta } = props

  return (
    <ListGroup className="text-center">
      {props.pasta.comments.map((c) => {
        return (
          <ListGroup.Item key={c.id}>
            {c.author} | {c.comment}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default PastaReviews
