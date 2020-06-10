export const getDomain = (data: any): string => {
  let domain = data.toString();
  if (domain.indexOf("//") > -1) {
    domain = domain.substring(domain.indexOf("//") + 2);
  }
  if (domain.indexOf("/") > -1) {
    domain = domain.substring(0, domain.indexOf("/"));
  }
  return domain;
};
