import 'svg-classlist-polyfill'
import Vue from 'vue'
import App from './App.vue'
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// make FA does not watch SVG elements
if (window.FontAwesome) window.FontAwesome.config.observeMutations = false;
Vue.config.productionTip = false;

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// load and set the HTML template we are using
let audit_content = $(".audit-content");
audit_content.html(require("@/template.html"));

new Vue({
  render: h => h(App)
}).$mount("#app");

// add help message
function add_help_message() {
  let helpMessage = `<p class='help-message'>
  Comments or feedback? Please contact
  <a href="mailto:controller.policy@phila.gov">controller.policy@phila.gov</a>.
  </p>`;
  $(".back-link").after(helpMessage);
}

// add a help message
add_help_message();

