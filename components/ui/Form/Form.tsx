"use client";

import {  useState } from "react";
import { FormProps } from "@/types/components/ui/FormProps";
import styles from "@/components//ui/Form/Form.module.css";
import Button from "@/components/ui/Button/Button";

export default function Form({
  titreForm,
  champs,
  names,
  buttonText,
  placeHolders,
  textAreas,
  defaultValues,
  selects,
  onSubmit,
  footerContent,
}: FormProps) {
  
  const initialData: Record<string, string> = {
  ...(defaultValues ?? {}),
};

selects?.forEach((select) => {
  if (!initialData[select.name]) {
    initialData[select.name] = select.selectDefaultValue ?? "";
  }
});

const initialDataKey = JSON.stringify(initialData);

const [formData, setFormData] =
  useState<Record<string, string>>(initialData);

const [previousInitialDataKey, setPreviousInitialDataKey] =
  useState(initialDataKey);

if (initialDataKey !== previousInitialDataKey) {
  setPreviousInitialDataKey(initialDataKey);
  setFormData(initialData);
}

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="pageCenter">
      <div className={styles.formCard}>
        <h1 className={styles.formTitle}>{titreForm}</h1>

        <form className={styles.formForm} onSubmit={handleSubmit}>
          {champs.map((champ, index) => {
            const key = names[index];

            return (
              <div key={index} className={styles.formGroup}>
                <label htmlFor={key}>{champ}</label>
                <input
                  type={
                    key.toLowerCase().includes("date")
                      ? "date"
                      : key === "password"
                        ? "password"
                        : "text"
                  }
                  id={key}
                  placeholder={placeHolders?.[index] || ""}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          })}

          {textAreas?.map((textArea, index) => {
            const key = textArea;
            return (
              <div key={index} className={styles.formTextarea}>
                <label htmlFor={key}>{textArea}</label>
                <textarea
                  id={key}
                  placeholder={textArea}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          })}

          {selects?.map((select) => (
            <div key={select.name} className={styles.formGroup}>
              <label htmlFor={select.name}>{select.label}</label>

              <select
                id={select.name}
                value={formData[select.name] || ""}
                onChange={(e) => handleChange(select.name, e.target.value)}
                className={styles.select}
              >
                {select.values.map((value, index) => (
                  <option key={value} value={value}>
                    {select.texts[index]}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <Button text={buttonText} />

          {footerContent && (
            <div className={styles.formFooter}>{footerContent}</div>
          )}
        </form>
      </div>
    </div>
  );
}
