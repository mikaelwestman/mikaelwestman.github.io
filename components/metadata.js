class Meta extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-49182208-1"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-49182208-1');
		</script>

		<title>Mikael Westman — Product Designer</title>
		<meta name="description" content="Mikael Westman is a Swedish Product Designer. Currently at Epidemic Sound in Stockholm, previously at Square in New York City.">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" type="image/png" href="icon.png?v=1" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    `;
  }
}

customElements.define('metadata-component', Meta);