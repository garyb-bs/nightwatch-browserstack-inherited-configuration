const baseConfig = require("./base_config");

const bstackOptions = {
	'bstack:options' : {
		"os" : "OS X",
		"osVersion" : "Big Sur",
		"buildName" : "browserstack-build-1",
		"sessionName" : "NightWatch Test Session",
		"seleniumVersion" : "4.0.0",
		userName: '${BROWSERSTACK_USERNAME}',
		accessKey: '${BROWSERSTACK_ACCESS_KEY}',
	},
  }
  
  
  
  const browserStack = {
	webdriver: {
	  start_process: false
	},
  
	selenium: {
	  host: 'hub.browserstack.com',
	  port: 443
	},
  
	desiredCapabilities: {
		browserName: 'chrome',
	  ...bstackOptions
	}
  }
  
  module.exports = {
	...baseConfig,
	src_folders: ["src/tests/suites"],
	page_objects_path: "src/app/pages/",
	output_folder: "results",
	live_output: true,
	plugins: ['@nightwatch/browserstack'],
      // browserstack plugin settings...
               '@nightwatch/browserstack': {
        browserstackLocal: false, // set true to manage browserstack local tunnel. Defaults to false.
      },
	
  
	test_settings: {
	  default: {
		launch_url: 'https://bstackdemo.com',
		desiredCapabilities:{
		  browserName: 'chrome',
		  ...bstackOptions
		},
	  },
	  test_runner: {
			type: "nightwatch",
			parallel: true,
			jobs: 10,
			timeout: 9000000,
		},
      test_workers: {
            enabled: true,
            workers: 5,
            node_options: "inherit",
      },
	  
  
	  browserstack:  {
		...browserStack
	  },
  
	  "browserstack.chrome": {
		...browserStack,
		desiredCapabilities:{
		  browserName: 'chrome',
		  ...bstackOptions
		}
	  },
	  "browserstack.firefox": {
		...browserStack,
		desiredCapabilities:{
		  browserName: 'firefox',
		  ...bstackOptions
		}
	  },
	  "browserstack.edge": {
		...browserStack,
		desiredCapabilities:{
		  browserName: 'Edge',
		  ...bstackOptions
		}
	  },
	  
	}
  }