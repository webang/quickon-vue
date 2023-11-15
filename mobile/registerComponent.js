import widgetMenu from './widget-menu';

export function registerComponent(Vue) {
  Object.keys(widgetMenu.widgetLabel).forEach(key => {
    const component = require(`./h-components/${key}`).default;
    console.log(component)
    Vue.component(component.name, component);
  });
}
