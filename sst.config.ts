import type { SSTConfig } from "sst";
import { SolidStartSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "let-it-go",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new SolidStartSite(stack, "site", {
        buildCommand: "pnpm build",
        // customDomain: {
        //   hostedZone: "allaude.com",
        //   domainName: "desapego.allaude.com",
        // },
        environment: {
          WEBINY_API_KEY: process.env.WEBINY_API_KEY,
          WEBINY_API_URL: process.env.WEBINY_API_URL,
        },
      });

      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
