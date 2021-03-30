import { handleSubmit } from './js/formHandler'

import './styles/base.scss'
import './styles/form.scss'
import './styles/style.scss'

import placeholderDestination from './media/destination-placeholder.jpg'

export { handleSubmit } 

document.getElementById("generate").addEventListener('click', e => handleSubmit(e))
document.getElementById("trip_destination_image").src = placeholderDestination
