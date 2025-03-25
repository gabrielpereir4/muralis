package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Contato;
import com.example.demo.repository.ContatoRepository;

@RestController
@RequestMapping("/contatos")
@CrossOrigin(origins = "http://localhost:3000")
public class ContatoController {

    private final ContatoRepository contatoRepository;

    public ContatoController(ContatoRepository contatoRepository) {
        this.contatoRepository = contatoRepository;
    }

    // Atualiza um contato
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarContato(@PathVariable Long id, @RequestBody Contato atualizado) {
        return contatoRepository.findById(id)
                .map(contato -> {
                    contato.setTipo(atualizado.getTipo());
                    contato.setValor(atualizado.getValor());
                    contato.setObservacao(atualizado.getObservacao());
                    return ResponseEntity.ok(contatoRepository.save(contato));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deleta um contato
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarContato(@PathVariable Long id) {
        if (!contatoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        contatoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}