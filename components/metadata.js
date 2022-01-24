class Meta extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<title>Mikael Westman — Product Designer</title>
		<meta name="description" content="Portfolio of Mikael Westman, Product Designer at Epidemic Sound in Stockholm, previously at Square in New York City.">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" type="image/png" href="icon.png?">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    `;
  }
}

customElements.define('metadata-component', Meta);