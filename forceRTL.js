const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { withDangerousMod } = require("@expo/config-plugins");

const withCustomCode = (config) => {
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      // Locate the file
      const filePath =
        "android/app/src/main/java/com/oxygen/esharty/MainApplication.java";
      let mainApplication = await readFile(filePath, "utf8");

      // Add the import statement if it's not already present
      if (
        !mainApplication.includes(
          "import com.facebook.react.modules.i18nmanager.I18nUtil;"
        )
      ) {
        const packageStatementEnd = mainApplication.indexOf(";") + 1;
        mainApplication =
          mainApplication.slice(0, packageStatementEnd) +
          "\nimport com.facebook.react.modules.i18nmanager.I18nUtil;" +
          mainApplication.slice(packageStatementEnd);
      }

      // Append the code after SoLoader.init()
      if (
        !mainApplication.includes(
          "I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();"
        )
      ) {
        const soLoaderInitEnd =
          mainApplication.indexOf(
            "SoLoader.init(this, /* native exopackage */ false);"
          ) + "SoLoader.init(this, /* native exopackage */ false);".length;
        mainApplication =
          mainApplication.slice(0, soLoaderInitEnd) +
          "\nI18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();\nsharedI18nUtilInstance.forceRTL(this,true);\nsharedI18nUtilInstance.allowRTL(this, true);" +
          mainApplication.slice(soLoaderInitEnd);
      }

      // Write the modified contents back to the file
      await writeFile(filePath, mainApplication, "utf8");

      return config;
    },
  ]);

  config = withDangerousMod(config, [
    "android",
    async (config) => {
      // Locate the file
      const filePath = "android/app/src/main/AndroidManifest.xml";
      let manifest = await readFile(filePath, "utf8");

      // Add android:supportsRtl="true" to the <application> tag if it's not already present
      if (!manifest.includes('android:supportsRtl="true"')) {
        manifest = manifest.replace(
          "<application",
          '<application android:supportsRtl="true"'
        );
      }

      // Write the modified contents back to the file
      await writeFile(filePath, manifest, "utf8");

      return config;
    },
  ]);
  config = withDangerousMod(config, [
    "ios",
    async (config) => {
      // Locate the file
      const filePath = "ios/esharti/AppDelegate.mm";
      let appDelegate = await readFile(filePath, "utf8");

      // Add the import statement after #import "AppDelegate.h"
      if (!appDelegate.includes("#import <React/RCTI18nUtil.h>")) {
        const importStatementEnd =
          appDelegate.indexOf('#import "AppDelegate.h"') +
          '#import "AppDelegate.h"'.length;
        appDelegate =
          appDelegate.slice(0, importStatementEnd) +
          "\n#import <React/RCTI18nUtil.h>" +
          appDelegate.slice(importStatementEnd);
      }

      const returnStatementStart = appDelegate.indexOf(
        "return [super application:application didFinishLaunchingWithOptions:launchOptions];"
      );

      // Append the code before return [super application:application didFinishLaunchingWithOptions:launchOptions];
      appDelegate =
        appDelegate.slice(0, returnStatementStart) +
        "\n[[RCTI18nUtil sharedInstance] allowRTL:YES];\n[[RCTI18nUtil sharedInstance] forceRTL:YES];\n" +
        appDelegate.slice(returnStatementStart);

      // Write the modified contents back to the file
      await writeFile(filePath, appDelegate, "utf8");

      return config;
    },
  ]);

  return config;
};

module.exports = withCustomCode;
