import './polyfills'

class SimpleGallery {
	constructor(form, name = 'gallery', container = '.gallery-container') {
		this.form = document.querySelector(form)
		this.input = this.form.querySelector(`input[name="${name}"]`)

		// Initers
		this.initDOM(container)
		this.initGallery()
		this.initSortable()

		// Listeners
		this.eventListeners()
	}

	initDOM(container) {
		this.form.querySelector(container).innerHTML += `
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

		const html = gallery.reduce((html, image) => html += this.generateDOM(image), '')

		this.form.querySelector('.gallery-items').innerHTML = html
	}

	initSortable() {
		const container = this.form.querySelector('.gallery-items')
		Sortable.create(container, {
			animation: 150,
			onUpdate: (e) => {
				const gallery = JSON.parse(this.input.value)
				const { oldIndex, newIndex } = e

				gallery.swap(oldIndex, newIndex)

				this.input.value = JSON.stringify(gallery)
			}
		})
	}

	eventListeners() {
		this.form.querySelector('.upload').addEventListener('change', this.addItem.bind(this))
		this.form.querySelector('.gallery').delegate('click', '.remove', this.removeItem.bind(this))
		this.form.querySelector('.gallery').delegate('change', '.title', this.changeTitle.bind(this))
	}

	addItem(e) {
		e.preventDefault()
		const { files } = e.target
		const data = new FormData()

		for (let i in files) {
			if (!files.hasOwnProperty(i)) return
			data.append('gallery[]', files[i])
		}

		this.request(data)
	}

	request(data) {
		const _this = this
		const xhttp = new XMLHttpRequest()
		const customAction = this.form.getAttribute('data-action-gallery')
		const action = (customAction) ? customAction : this.form.action
		const gallery = this.form.querySelector('.gallery')

		gallery.classList.add('loading-active')

		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				gallery.classList.remove('loading-active')
				if (xhttp.status == 200) {
					_this.addImages(xhttp.responseText)
				}
			}
		}

		xhttp.upload.addEventListener('progress', function(e) {
			const loading = _this.form.querySelector('.loading .bar')
			loading.style.width = Math.ceil((e.loaded/e.total) * 100) + '%'
    }, false)

		xhttp.open('POST', action, true)
		xhttp.send(data)
	}

	addImages(data) {
		const images = JSON.parse(data)
		let gallery = (this.input.value !== '') ? JSON.parse(this.input.value) : []

		images.map(image => {
			image.title = 'No description.'
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
      if (item.url !== url) return
      gallery.splice(i, 1)
    })

		this.saveGallery(gallery)
	}

	saveGallery(gallery) {
		const html = gallery.reduce((html, image) => html += this.generateDOM(image), '')
		this.input.value = JSON.stringify(gallery)
		this.form.querySelector('.gallery-items').innerHTML = html
	}

	changeTitle(e) {
		const gallery = JSON.parse(this.input.value)
		const item = e.target.parentElement
		const url = item.children[0].src

		gallery.forEach((item, i) => {
      if (item.url !== url) return
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
