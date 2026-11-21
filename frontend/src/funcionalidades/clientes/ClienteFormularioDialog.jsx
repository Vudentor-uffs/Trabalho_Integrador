import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

function dataAtualLocal() {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

export default function ClienteFormularioDialog({
    aberto,
    editando,
    pessoaFisica,
    formularioPessoaFisica,
    formularioPessoaJuridica,
    empresas,
    erro,
    salvando,
    aoFechar,
    aoSalvar,
    aoAlterarPessoaFisica,
    aoAlterarPessoaJuridica,
    somenteNumeros,
}) {
    return (
        <Dialog
            open={aberto}
            onClose={() => !salvando && aoFechar()}
            fullWidth
            maxWidth="sm"
        >
            <Box component="form" onSubmit={aoSalvar}>
                <DialogTitle>
                    {editando ? "Editar cliente" : "Novo cliente"} —{" "}
                    {pessoaFisica ? "Pessoa física" : "Pessoa jurídica"}
                </DialogTitle>
                <DialogContent className="formulario-cliente">
                    {pessoaFisica ? (
                        <Box className="campos-cliente">
                            <TextField
                                required
                                fullWidth
                                label="Nome completo"
                                value={formularioPessoaFisica.nome}
                                onChange={(evento) =>
                                    aoAlterarPessoaFisica("nome", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 100 } }}
                            />
                            <TextField
                                required
                                fullWidth
                                label="CPF"
                                value={formularioPessoaFisica.cpf}
                                onChange={(evento) =>
                                    aoAlterarPessoaFisica(
                                        "cpf",
                                        somenteNumeros(evento.target.value).slice(0, 11),
                                    )
                                }
                                slotProps={{
                                    htmlInput: { inputMode: "numeric", maxLength: 11 },
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                label="Data de nascimento"
                                type="date"
                                value={formularioPessoaFisica.dataNascimento}
                                onChange={(evento) =>
                                    aoAlterarPessoaFisica("dataNascimento", evento.target.value)
                                }
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    htmlInput: { max: dataAtualLocal() },
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                label="E-mail"
                                type="email"
                                value={formularioPessoaFisica.email}
                                onChange={(evento) =>
                                    aoAlterarPessoaFisica("email", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 255 } }}
                            />
                            <TextField
                                fullWidth
                                label="Telefone"
                                value={formularioPessoaFisica.telefone}
                                onChange={(evento) =>
                                    aoAlterarPessoaFisica("telefone", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 20 } }}
                            />
                            <FormControl required fullWidth>
                                <InputLabel id="tipo-pessoa-fisica-label">Vínculo</InputLabel>
                                <Select
                                    labelId="tipo-pessoa-fisica-label"
                                    label="Vínculo"
                                    value={formularioPessoaFisica.tipo}
                                    onChange={(evento) => {
                                        const tipo = evento.target.value;
                                        aoAlterarPessoaFisica("tipo", tipo);
                                        if (tipo === "Normal") {
                                            aoAlterarPessoaFisica("clientePjId", "");
                                        }
                                    }}
                                >
                                    <MenuItem value="Normal">Cliente</MenuItem>
                                    <MenuItem value="Colaborador">Colaborador</MenuItem>
                                </Select>
                            </FormControl>
                            {formularioPessoaFisica.tipo === "Colaborador" && (
                                <FormControl required fullWidth>
                                    <InputLabel id="empresa-colaborador-label">
                                        Empresa cliente
                                    </InputLabel>
                                    <Select
                                        labelId="empresa-colaborador-label"
                                        label="Empresa cliente"
                                        value={formularioPessoaFisica.clientePjId}
                                        onChange={(evento) =>
                                            aoAlterarPessoaFisica(
                                                "clientePjId",
                                                evento.target.value,
                                            )
                                        }
                                    >
                                        {empresas.map((empresa) => (
                                            <MenuItem
                                                key={empresa.id}
                                                value={String(empresa.id)}
                                            >
                                                {empresa.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                    ) : (
                        <Box className="campos-cliente">
                            <TextField
                                required
                                fullWidth
                                label="Nome da empresa"
                                value={formularioPessoaJuridica.nome}
                                onChange={(evento) =>
                                    aoAlterarPessoaJuridica("nome", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 100 } }}
                            />
                            <TextField
                                required
                                fullWidth
                                label="CNPJ"
                                value={formularioPessoaJuridica.cnpj}
                                onChange={(evento) =>
                                    aoAlterarPessoaJuridica(
                                        "cnpj",
                                        somenteNumeros(evento.target.value).slice(0, 14),
                                    )
                                }
                                slotProps={{
                                    htmlInput: { inputMode: "numeric", maxLength: 14 },
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                label="E-mail"
                                type="email"
                                value={formularioPessoaJuridica.email}
                                onChange={(evento) =>
                                    aoAlterarPessoaJuridica("email", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 255 } }}
                            />
                            <TextField
                                fullWidth
                                label="Telefone"
                                value={formularioPessoaJuridica.telefone}
                                onChange={(evento) =>
                                    aoAlterarPessoaJuridica("telefone", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 20 } }}
                            />
                            <TextField
                                required
                                fullWidth
                                label="Endereço"
                                value={formularioPessoaJuridica.endereco}
                                onChange={(evento) =>
                                    aoAlterarPessoaJuridica("endereco", evento.target.value)
                                }
                                slotProps={{ htmlInput: { maxLength: 150 } }}
                            />
                        </Box>
                    )}
                    {erro && <Alert severity="error">{erro}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={aoFechar} disabled={salvando} color="inherit">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={salvando}>
                        {salvando ? "Salvando..." : "Salvar cliente"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
