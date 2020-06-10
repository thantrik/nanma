import React, { useRef } from "react";
import {
  PrimaryButton,
  Button,
  Stack,
  TextFieldBase,
  RefObject,
} from "@fluentui/react";
import { useId } from "@uifabric/react-hooks";
import { IFormField, FormField } from "./FormField";
import CodeField from "../code-field";

const MyWebSnippetInputForm = (props: any) => {
  let {
    readOnly: isPreview = false,
    urlToMatch: txtUrlToMatch = "",
    domainCSS = "",
    domainScript = "",
  } = props;

  const urlToMatch: IFormField = {
    isPreview,
    ref: undefined,
    id: useId("urlToMatch"),
    value: txtUrlToMatch,
    label: "Regexp for url match",
    setRef: (ref: any) => (urlToMatch.ref = ref),
  };
  const refDomainCSS = useRef<CodeField>() as RefObject<CodeField>,
    refDomainScript = useRef<CodeField>() as RefObject<CodeField>;

  //useEffect(() => console.log(props), [...Object.values(props)]);

  const onSubmit = () => {
    console.log(urlToMatch?.ref);
    const txtUrlToMatch = ((urlToMatch?.ref as unknown) as TextFieldBase).value,
      txtDomainCSS = ((refDomainCSS.current as unknown) as CodeField)?.value,
      txtDomainScript = ((refDomainScript.current as unknown) as CodeField)
        ?.value;
    console.log(txtUrlToMatch, txtDomainCSS, txtDomainScript);
    props.onSubmit &&
      props.onSubmit({
        test: txtUrlToMatch,
        css: [txtDomainCSS],
        script: [txtDomainScript],
      });
  };

  return (
    <fieldset
      style={{
        boxShadow:
          "0 1px 1.5px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
        width: "100%",
        marginRight: "auto",
        marginLeft: "auto",
        padding: "1vw",
        borderRadius: 2,
        boxSizing: "border-box",
      }}
    >
      <legend>
        <b>Domain snippets</b>
      </legend>

      <form>
        <FormField {...urlToMatch}></FormField>
        <h5>CSS for domain</h5>
        <CodeField
          ref={refDomainCSS}
          language="css"
          data={domainCSS}
        ></CodeField>
        <h5>Scripts for domain</h5>
        <CodeField
          ref={refDomainScript}
          language="javascript"
          data={domainScript}
        ></CodeField>
        <br />
        {!isPreview && (
          <Stack horizontal reversed tokens={{ childrenGap: 3 }}>
            <Button> Cancel </Button>
            <PrimaryButton onClick={onSubmit}>Save</PrimaryButton>
          </Stack>
        )}
      </form>
    </fieldset>
  );
};

export default MyWebSnippetInputForm;
