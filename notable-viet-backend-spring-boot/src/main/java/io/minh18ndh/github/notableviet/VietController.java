package io.minh18ndh.github.notableviet;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/notable-viet")
public class VietController {

    @Autowired
    private VietService vietService;
    @GetMapping
    public ResponseEntity<List<Viet>> getAllViets() {

        return new ResponseEntity<List<Viet>>(vietService.allViets(), HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<Viet>> getSingleViet(@PathVariable ObjectId id) {
//
//        return new ResponseEntity<Optional<Viet>>(vietService.singleViet(id), HttpStatus.OK);
//    }
}


