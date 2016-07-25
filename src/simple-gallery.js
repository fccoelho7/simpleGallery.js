import './polyfills'

class SimpleGallery {
	constructor(form, name = 'gallery', container = '.gallery-container') {
		this.form = form
		this.input = document.querySelector(`${this.form} input[name="${name}"]`)

		this.initDOM(container)
		this.initGallery()
		this.initSortable()
		this.eventListeners()
	}

	initDOM(container) {
		document.querySelector(`${this.form} ${container}`).innerHTML += `
			<div class="gallery">
				<div class="gallery-items"></div>
				<div class="loading">
					<span class="bar"></span>
				</div>
			</div>`
	}

	initGallery() {
		if (!this.input.value) return

		const gallery = JSON.parse(this.input.value)

		if (gallery.lenght == 0) return

		let html = ''

		gallery.map(image => html += this.generateDOM(image))
		document.querySelector('.gallery-items').innerHTML = html
	}

	initSortable() {
		const container = document.querySelector(`${this.form} .gallery-items`)
		Sortable.create(container, {
			animation: 150,
			onUpdate: (e) => {
				const gallery = JSON.parse(this.input.value)
				const oldIndex = e.oldIndex
				const newIndex = e.newIndex

				gallery.swap(oldIndex, newIndex)

				this.input.value = JSON.stringify(gallery)
			}
		})
	}

	eventListeners() {
		document.querySelector(`${this.form} input.upload`).addEventListener('change', this.addItem.bind(this))
		document.querySelector('.gallery').delegate('click', '.remove', this.removeItem.bind(this))
		document.querySelector('.gallery').delegate('change', '.item', this.changeTitle.bind(this))
	}

	addItem(e) {
		e.preventDefault()
		const files = e.target.files
		const data = new FormData()

		for (let i in files) {
			if (files.hasOwnProperty(i)) {
				data.append('gallery[]', files[i])
			}
		}

		this.makeAJAX(data)
	}

	makeAJAX(data) {
		const self = this
		const xhttp = new XMLHttpRequest()
		const form = document.querySelector(this.form)
		const dataAction = form.getAttribute('data-action-gallery')
		const action = (dataAction) ? dataAction : form.action

		document.querySelector('.gallery').classList.add('loading-active')

		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				document.querySelector('.gallery').classList.remove('loading-active')
				if (xhttp.status == 200) {
					self.addImages(xhttp.responseText)
				}
			}
		}

		xhttp.upload.addEventListener('progress', function(e) {
			const loading = document.querySelector(`${self.form} .loading .bar`)
			loading.style.width = Math.ceil((e.loaded/e.total) * 100) + '%'
    }, false)

		xhttp.open('POST', action, true)
		xhttp.send(data)
	}

	addImages(data) {
		const images = JSON.parse(data)
		let gallery = (this.input.value != '') ? JSON.parse(this.input.value) : []

		images.map(image => {
			image.title = 'No description'
			gallery.push(image)
		})

		this.saveGallery(gallery)
	}

	removeItem(e) {
		e.preventDefault()
		const gallery = JSON.parse(this.input.value)
		const item = e.target.parentElement
		const url = item.children[0].src

		gallery.forEach((item, i) => {
      if (item.url != url) return
      gallery.splice(i, 1)
    })

		this.saveGallery(gallery)
	}

	saveGallery(gallery) {
		let html = ''
		gallery.map(image => html += this.generateDOM(image))
		this.input.value = JSON.stringify(gallery)
		document.querySelector('.gallery-items').innerHTML = html
	}

	changeTitle(e) {
		const gallery = JSON.parse(this.input.value)
		const item = e.target.parentElement
		const url = item.children[0].src

		gallery.forEach((item, i) => {
      if (item.url != url) return
      gallery[i]['title'] = e.target.value
    })

		this.input.value = JSON.stringify(gallery)
	}

	generateDOM(image) {
		return `
			<div class="gallery-item">
				<img src='${image.url}' alt='${image.title}' />
				<input class="title" name="title" value="${image.title}" />
				<button class='remove'>×</button>
			</div>
		`
	}
}

module.exports = SimpleGallery
