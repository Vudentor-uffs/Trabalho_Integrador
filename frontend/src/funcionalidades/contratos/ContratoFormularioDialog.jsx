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
    Typography,
} from "@mui/material";

export default function ContratoFormularioDialog({
    aberto,
    editando,
    formulario,
    clientesDisponiveis,
    erro,
    salvando,
    aoFechar,
    aoSalvar,
    aoAlterarCampo,
}) {
    return (
        <Dialog
            open={aberto}
            onClose={() => !salvando && aoFechar()}
            fullWidth
            maxWidth="md"
        >
            <Box component="form" onSubmit={aoSalvar}>
                <DialogTitle>{editando ? "Editar contrato" : "Novo contrato"}</DialogTitle>
                <DialogContent className="formulario-contrato">
                    <Typography variant="subtitle2" color="text.secondary">
                        DADOS DO CONTRATO
                    </Typography>
                    <Box className="campos-contrato">
                        <FormControl fullWidth>
                            <InputLabel id="tipo-cliente-label">Tipo de cliente</InputLabel>
                            <Select
                                labelId="tipo-cliente-label"
                                label="Tipo de cliente"
                                value={formulario.tipoCliente}
                                onChange={(evento) => {
                                    aoAlterarCampo("tipoCliente", evento.target.value);
                                    aoAlterarCampo("clienteId", "");
                                }}
                            >
                                <MenuItem value="PF">Pessoa física</MenuItem>
                                <MenuItem value="PJ">Pessoa jurídica</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth required>
                            <InputLabel id="cliente-contrato-label">Cliente</InputLabel>
                            <Select
                                labelId="cliente-contrato-label"
                                label="Cliente"
                                value={formulario.clienteId}
                                onChange={(evento) =>
                                    aoAlterarCampo("clienteId", evento.target.value)
                                }
                            >
                                {clientesDisponiveis.map((cliente) => (
                                    <MenuItem key={cliente.id} value={String(cliente.id)}>
                                        {cliente.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            fullWidth
                            label="Data de início"
                            type="date"
                            value={formulario.dataInicio}
                            onChange={(evento) =>
                                aoAlterarCampo("dataInicio", evento.target.value)
                            }
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Data de término"
                            type="date"
                            value={formulario.dataFim}
                            onChange={(evento) => aoAlterarCampo("dataFim", evento.target.value)}
                            slotProps={{
                                inputLabel: { shrink: true },
                                htmlInput: { min: formulario.dataInicio || undefined },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Valor contratual (R$)"
                            type="number"
                            value={formulario.valor}
                            onChange={(evento) => aoAlterarCampo("valor", evento.target.value)}
                            slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Multa contratual (R$)"
                            type="number"
                            value={formulario.multa}
                            onChange={(evento) => aoAlterarCampo("multa", evento.target.value)}
                            slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Prazo do contrato (meses)"
                            type="number"
                            value={formulario.validade}
                            onChange={(evento) =>
                                aoAlterarCampo("validade", evento.target.value)
                            }
                            slotProps={{ htmlInput: { min: 1, step: 1 } }}
                        />
                        <TextField
                            required
                            fullWidth
                            multiline
                            minRows={3}
                            className="campo-proposta-contrato"
                            label="Proposta / descrição do serviço"
                            value={formulario.proposta}
                            onChange={(evento) => aoAlterarCampo("proposta", evento.target.value)}
                        />
                    </Box>
                    {erro && <Alert severity="error">{erro}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={aoFechar} disabled={salvando} color="inherit">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={salvando}>
                        {salvando ? "Salvando..." : "Salvar contrato"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
