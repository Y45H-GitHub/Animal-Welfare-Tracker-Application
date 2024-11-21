package com.example.AnimalWelfare.service;

import com.example.AnimalWelfare.entity.Animal;
import com.example.AnimalWelfare.repo.AnimalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepo animalRepo;

    public Animal feedAnimal(Long id, boolean fedToday, LocalDateTime lastFed) {
        Animal animal = animalRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        animal.setFedToday(fedToday);
        animal.setLastFed(lastFed);

        return animalRepo.save(animal);
    }

    // Adopt an animal
    public Animal adoptAnimal(Long id) {
        Animal animal = animalRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        // Change status to "pending" when adopted
        animal.setStatus("pending");

        return animalRepo.save(animal);
    }

    //Report an animal
    public Animal saveAnimal(Animal animal) {
        return animalRepo.save(animal);
    }
}
