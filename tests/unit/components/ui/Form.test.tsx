import Form from "@/components/ui/Form/Form";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Form", () => {
  it("envoie les valeurs saisies et la valeur du select", () => {
    const onSubmit = jest.fn();

    render(
      <Form
        titreForm="Connexion"
        champs={["Adresse e-mail"]}
        names={["email"]}
        buttonText="Envoyer"
        placeHolders={["email@example.com"]}
        defaultValues={{ email: "ancien@example.com" }}
        selects={[
          {
            label: "Rôle",
            name: "role",
            values: ["user", "admin"],
            texts: ["Utilisateur", "Administrateur"],
            selectDefaultValue: "user",
          },
        ]}
        onSubmit={onSubmit}
      />,
    );

    const emailInput = screen.getByLabelText("Adresse e-mail");
    const roleSelect = screen.getByLabelText("Rôle");

    expect(emailInput).toHaveValue("ancien@example.com");
    expect(roleSelect).toHaveValue("user");

    fireEvent.change(emailInput, {
      target: { value: "nouveau@example.com" },
    });

    fireEvent.change(roleSelect, {
      target: { value: "admin" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "nouveau@example.com",
      role: "admin",
    });
  });

  it("actualise les valeurs quand les données de l’API arrivent", () => {
    const { rerender } = render(
      <Form
        titreForm="Profil"
        champs={["Pseudo"]}
        names={["pseudo"]}
        buttonText="Modifier"
        defaultValues={{ pseudo: "" }}
      />,
    );

    expect(screen.getByLabelText("Pseudo")).toHaveValue("");

    rerender(
      <Form
        titreForm="Profil"
        champs={["Pseudo"]}
        names={["pseudo"]}
        buttonText="Modifier"
        defaultValues={{ pseudo: "Celeste" }}
      />,
    );

    expect(screen.getByLabelText("Pseudo")).toHaveValue("Celeste");
  });
});