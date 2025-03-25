package com.example.demo.controller;

import com.example.demo.model.Cliente;
import com.example.demo.model.Contato;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.ContatoRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteRepository clienteRepository;
    private final ContatoRepository contatoRepository;

    // Criar cliente (verifica CPF único)
    @PostMapping
    public ResponseEntity<?> criarCliente(@RequestBody Cliente cliente) {
        if (clienteRepository.existsByCpf(cliente.getCpf())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("CPF já cadastrado.");
        }

        Cliente salvo = clienteRepository.save(cliente);
        return ResponseEntity.ok(salvo);
    }

    // Buscar todos os clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientes() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }

    // Busca por nome ou CPF
    @GetMapping("/search")
    public ResponseEntity<List<Cliente>> buscarPorNomeOuCpf(@RequestParam String termo) {
        List<Cliente> resultado = clienteRepository
            .findByNomeContainingIgnoreCaseOrCpfContaining(termo, termo);
        return ResponseEntity.ok(resultado);
    }

    // Busca um cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar cliente
    @PutMapping("/{id}")
public ResponseEntity<?> atualizarCliente(@PathVariable Long id, @RequestBody Cliente atualizado) {
    if (atualizado.getNome() == null || atualizado.getNome().trim().isEmpty()) {
        return ResponseEntity.badRequest().body("Nome não pode estar vazio.");
    }

    if (atualizado.getCpf() == null || atualizado.getCpf().trim().isEmpty()) {
        return ResponseEntity.badRequest().body("CPF é obrigatório.");
    }

    if (atualizado.getDataNascimento() == null) {
        return ResponseEntity.badRequest().body("Data de nascimento inválida.");
    }

    Optional<Cliente> clienteComMesmoCpf = clienteRepository.findByCpf(atualizado.getCpf());
    if (clienteComMesmoCpf.isPresent() && !clienteComMesmoCpf.get().getId().equals(id)) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("CPF já cadastrado para outro cliente.");
    }

    return clienteRepository.findById(id)
        .map(cliente -> {
            cliente.setNome(atualizado.getNome());
            cliente.setCpf(atualizado.getCpf());
            cliente.setDataNascimento(atualizado.getDataNascimento());
            cliente.setEndereco(atualizado.getEndereco());
            Cliente clienteAtualizado = clienteRepository.save(cliente);
            return ResponseEntity.ok(clienteAtualizado);
        })
        .orElse(ResponseEntity.notFound().build());
}

    // Deletar cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }

    // Listar contatos do cliente
    @GetMapping("/{id}/contatos")
    public ResponseEntity<List<Contato>> listarContatosPorCliente(@PathVariable Long id) {
        List<Contato> contatos = contatoRepository.findByClienteId(id);
        return ResponseEntity.ok(contatos);
    }

    // Adicionar contato para um cliente
    @PostMapping("/{id}/contatos")
    public ResponseEntity<?> adicionarContato(@PathVariable Long id, @RequestBody Contato contato) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(id);
        if (clienteOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        contato.setCliente(clienteOpt.get());
        Contato salvo = contatoRepository.save(contato);
        return ResponseEntity.ok(salvo);
    }


}