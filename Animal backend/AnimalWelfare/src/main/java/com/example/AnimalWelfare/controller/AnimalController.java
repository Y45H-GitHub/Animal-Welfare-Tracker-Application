package com.example.AnimalWelfare.controller;

import com.example.AnimalWelfare.dto.FeedRequest;
import com.example.AnimalWelfare.entity.Animal;
import com.example.AnimalWelfare.repo.AnimalRepo;
import com.example.AnimalWelfare.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@RestController
public class AnimalController {
    @Autowired
    private AnimalRepo animalRepo;

    @Autowired
    private AnimalService animalService;

    //TO GET ALL ANIMAL LIST
    @GetMapping("/api/all")
    public List<Animal> getAnimals(){
        return animalRepo.findAll();
    }

    // TO SET IF FED OR NOT
    @PutMapping("api/feed/{id}")
    public ResponseEntity<Animal> feedAnimal(@PathVariable Long id, @RequestBody FeedRequest feedRequest) {
        Animal updatedAnimal = animalService.feedAnimal(id, feedRequest.isFedToday(), LocalDateTime.now());
        return ResponseEntity.ok(updatedAnimal);
    }

    // TO SET ADOPT OR NOT
    @PutMapping("/api/adopt/{id}")
    public ResponseEntity<Animal> adoptAnimal(@PathVariable Long id) {
        Animal updatedAnimal = animalService.adoptAnimal(id);
        return ResponseEntity.ok(updatedAnimal);
    }

    // TO ADD ANIMAL FROM FORM
    @PostMapping("api/animals/report")
    public ResponseEntity<Animal> reportAnimal(@RequestBody Animal animal) {
        animal.setReportedAt(LocalDateTime.now());
        animal.setStatus("reported");
        Animal savedAnimal = animalService.saveAnimal(animal);
        return ResponseEntity.ok(savedAnimal);
    }
}
