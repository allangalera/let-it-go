import type { Item } from "~/types";
function guidGenerator() {
  return Math.random()
    .toString(36)
    .replace("0.", "image_" || "");
}

export const items = [
  {
    name: "Ventilador de mesa",
    url: "https://www.arno.com.br/ventilador-arno-turbo-force-de-mesa-40cm-vf49-220v-2720015376-pai/p",
    price: 0,
  },
  {
    name: "Ventilador de chão",
    url: "https://www.amazon.com.br/Ventilador-Coluna-127V-Britnia-Preto/dp/B076B8XD7Y",
    price: 50,
  },
  {
    name: "Mesa com duas cadeiras (plástico / exterior)",
    url: "https://www.amazon.com.br/Ventilador-Coluna-127V-Britnia-Preto/dp/B076B8XD7Y",
    price: 200,
  },
  {
    name: "Escrivaninha preta L",
  },
  {
    name: "Escravinha branca regular",
  },
  {
    name: "Panela de pressão elétrica Electrolux",
    url: "https://www.amazon.com.br/gp/product/B076HYKFL7",
    price: 400,
  },
  {
    name: "Air fryer Mondial",
    url: "https://www.emondial.com.br/fritadeira-sem-oleo-air-fryer-3-5l-mondial-af-31/p",
    price: 150,
  },
  {
    name: "Fogão Electrolux preto",
    price: 1000,
  },
  {
    name: "Microondas Electrolux prata",
    price: 500,
  },
  {
    name: "Aspirador de pó 110v",
    price: 200,
  },
  {
    name: "Sofá retrátil verde",
    url: "https://www.madeiramadeira.com.br/sofa-capriccio-2-10m-assento-com-braco-retratil-e-reclinavel-velosuede-verde-4614442.html",
    price: 1200,
  },
  {
    name: "Máquina de lavar roupa (lava e seca)",
    url: "https://www.casasbahia.com.br/lava-e-seca-midea-lse11p-storm-wash-inverter-tambor-4d-11-kg-preta-55024524/p/55024524",
    price: 3500,
  },
  {
    name: "Armário área de serviço",
    url: "https://www.madeiramadeira.com.br/armario-multiuso-2-portas-5-prateleiras-linus-qmovi-695469.html",
    price: 50,
  },
  {
    name: "Televisão (LG 55 polegadas)",
    url: "https://www.amazon.com.br/gp/product/B07WJYCSN2",
    price: 2000,
  },
  {
    name: "Cadeira escritório Flexform",
    url: "https://www.flexform.com.br/cadeiras/cadeiras-de-escritorio/led-all-black",
    price: 1500,
  },
  {
    name: "Cadeira escritório Mercado Livre",
    price: 400,
  },
  {
    name: "Cama box casal (inclui colchão)",
    price: 0,
  },
  {
    name: "Balança bioimpedância Xiaomi",
    url: "https://www.amazon.com.br/gp/product/B07VD9F419",
    price: 100,
  },
  {
    name: "Secador de cabelo (rosa)",
  },
  {
    name: "Secador de cabelo (preto)",
    url: "https://www.amazon.com.br/dp/B097HYQPJ1",
  },
  {
    name: "Grill Oister (sanduicheira)",
    url: "https://www.oster.com.br/grill-eletrico-multiuso-oster-inox/p",
  },
  {
    name: "Liquidificador Mondial Vermelho",
  },
  {
    name: "Cafeteira (automática)",
  },
  {
    name: "Prensa francesa",
  },
  {
    name: "Filtro de água Electrolux preto",
    url: "https://www.amazon.com.br/gp/product/B08X66RQ48",
  },
  {
    name: "Monitor Dell 21 polegadas",
  },
  {
    name: "Mesa de cabeçeira",
    url: "https://www.madeiramadeira.com.br/mesa-de-cabeceira-compacta-retro-decore-mesinha-canto-quarto-gaveta-nicho-preto-rpm-moveis-2581082.html?id=2581082",
  },
  {
    name: "escorredor",
    url: "https://produto.mercadolivre.com.br/MLB-1570696571-escorredor-louca-30-pratos-chef-triplo-com-bandeja-p-agua-_JM?quantity=1&variation_id=58675943642",
  },
  {
    name: "rack sala",
    url: "https://www.mobly.com.br/rack-retro-goslar-fosco-preto-162-cm-417154.html#a=3|p=1|pn=1|t=Busca|s=0",
  },
  {
    name: "moedor café",
    url: "https://www.amazon.com.br/gp/product/B076HZQQ9X",
  },
  {
    name: "Apoio de headphone e controle",
    images: ["/images/20230414_215608.jpg", "/images/20230415_174158.jpg"],
  },
] satisfies Item[];

export const ItemsWithId = items.map((item) => {
  return {
    ...item,
    id: guidGenerator(),
  };
});
