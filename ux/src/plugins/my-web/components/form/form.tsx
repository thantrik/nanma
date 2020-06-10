import React, { useRef } from "react";
import {
  TextField,
  Label,
  PrimaryButton,
  Button,
  Stack,
  TextFieldBase,
} from "@fluentui/react";
import { useId } from "@uifabric/react-hooks";

const FormField = (props: any) => {
  const {
    isPreview,
    value,
    id,
    label,
    placeholder,
    setRef,
    multiline = false,
  } = props;
  const ref = useRef(null);
  setRef(ref);
  console.log(value);
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      {!isPreview ? (
        <TextField
          multiline={multiline}
          defaultValue={value}
          id={id}
          componentRef={setRef}
          placeholder={placeholder}
        />
      ) : (
        <Label>{value}</Label>
      )}
    </>
  );
};

interface IFormField {
  isPreview: boolean;
  id: string;
  ref: React.MutableRefObject<TextFieldBase> | undefined;
  value: string;
  label: string;
  setRef: (ref: React.MutableRefObject<TextFieldBase>) => void;
}

const MyWebSnippetInputForm = (props: any) => {
  const {
    readOnly: isPreview = false,
    urlToMatch: txtUrlToMatch = "",
    domainCSS: txtDomainCSS = "",
    domainScript: txtDomainScript = "",
  } = props;

  const urlToMatch: IFormField = {
      isPreview,
      ref: undefined,
      id: useId("urlToMatch"),
      value: txtUrlToMatch,
      label: "Regexp for url match",
      setRef: (ref: any) => (urlToMatch.ref = ref),
    },
    domainCSS: IFormField = {
      isPreview,
      ref: undefined,
      id: useId("domainCSS"),
      value: txtDomainCSS,
      label: "CSS for domain",
      setRef: (ref: any) => (domainCSS.ref = ref),
    },
    domainScript: IFormField = {
      isPreview,
      ref: undefined,
      id: useId("domainScript"),
      value: txtDomainScript,
      label: "Scripts for domain",
      setRef: (ref: any) => (domainScript.ref = ref),
    };

  //useEffect(() => console.log(props), [...Object.values(props)]);

  const onSubmit = () => {
    console.log(urlToMatch?.ref);
    const txtUrlToMatch = ((urlToMatch?.ref as unknown) as TextFieldBase).value,
      txtDomainCSS = ((domainCSS?.ref as unknown) as TextFieldBase).value,
      txtDomainScript = ((domainScript?.ref as unknown) as TextFieldBase).value;
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
        <FormField isPreview={isPreview} {...domainCSS} multiline></FormField>
        <FormField
          isPreview={isPreview}
          {...domainScript}
          multiline
        ></FormField>

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
