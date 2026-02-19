import Handlebars from "handlebars";

export default function handlebarsToHtml(templateString, templateParams) {
  const template = Handlebars.compile(templateString);

  const html = template(templateParams);

  return html;
}
